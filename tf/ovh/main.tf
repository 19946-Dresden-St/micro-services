terraform {
  required_providers {
    ovh = {
      source = "ovh/ovh"
    }
  }
}

provider "ovh" {
  endpoint           = "ovh-eu"
  application_key    = var.APP_KEY
  application_secret = var.APP_SECRET
  consumer_key       = var.CONSUMER_KEY
}

resource "ovh_vrack_cloudproject" "attach" {
  service_name = "pn-1094195" # vrack ID
  project_id   =  var.service_name # Public Cloud service name
}

resource "ovh_cloud_project_network_private" "network" {
  service_name = ovh_vrack_cloudproject.attach.project_id
  vlan_id    = 0
  name       = "cluster-network-pool"
  regions    = ["GRA7"]
  depends_on = [ovh_vrack_cloudproject.attach]
}

resource "ovh_cloud_project_network_private_subnet" "networksubnet" {
  service_name = ovh_cloud_project_network_private.network.service_name
  network_id   = ovh_cloud_project_network_private.network.id

  # whatever region, for test purpose
  region     = "GRA7"

  start      = "10.0.0.2"
  end        = "10.0.255.254"
  network    = "10.0.0.0/16"
  dhcp       = true
  no_gateway = false

  depends_on   = [ovh_cloud_project_network_private.network]
}


output "openstackID" {
  value = one(ovh_cloud_project_network_private.network.regions_attributes[*].openstackid)
}

# Create an OVHcloud Managed Kubernetes cluster
resource "ovh_cloud_project_kube" "ovh_cluster" {
  service_name = var.service_name
  name         = "ovh-pbs-cluster"
  region       = "GRA7"
  version      = "1.26"

  private_network_id = tolist(ovh_cloud_project_network_private.network.regions_attributes[*].openstackid)[0]

  depends_on = [ovh_cloud_project_network_private.network]
}

resource "ovh_cloud_project_kube_nodepool" "node_pool" {
  service_name  = var.service_name
  kube_id       = ovh_cloud_project_kube.ovh_cluster.id
  name          = "node-pool"
  flavor_name   = "d2-4"
  desired_nodes = 2
  max_nodes     = 3
  min_nodes     = 1

  monthly_billed = false

  
}