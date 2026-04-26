terraform {
  required_version = ">= 1.6.0, <2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
provider "aws" {
  region = "eu-north-1"
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # This is the official ID for Canonical (the makers of Ubuntu)

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }
}

resource "aws_instance" "my_web_server"{
  ami             =  data.aws_ami.ubuntu.id
  instance_type   =  var.instance_type
  key_name        =  aws_key_pair.deployer.key_name
  vpc_security_group_ids = [aws_security_group.vps_sg.id]

  root_block_device {
    volume_size = 30
    volume_type = "gp3"
  }

  tags = {
    Name = var.server-name
  }
}

resource "aws_security_group" "vps_sg" {
  name = "vps-security-group"
  description = "Allow SSH and Webtraffic"

  #Rule 1 : Allow SSH port 22 so you can log in 
  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"] #In production we keep our own IP 
  }
  #Rule 2 : Allow HTTP Port 80 for your mern app
  ingress{
  from_port = 80
  to_port = 80 
  protocol = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
  }

 #rule 3: allow frontend react 
  ingress{
    from_port = 5173
    to_port = 5173
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]

  }

  #rule 4 allow backend 

  ingress{
    from_port = 5001
    to_port = 5001
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  #rule 5 allow https for caddy
  ingress{
    from_port = 443
    to_port = 443
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress{
    from_port = 3000
    to_port = 3000
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  #Rule 6: Allow server to talk to the internet outbound 

  egress{
    from_port = 0
    to_port = 0
    protocol = "-1" # "-1" means all protocol 
    cidr_blocks = ["0.0.0.0/0"]
  }
  
}

resource "aws_key_pair" "deployer" {
  key_name = var.key_name
  public_key = file("~/.ssh/my-vps-key.pub")
}