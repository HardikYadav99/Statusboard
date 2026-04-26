output "latest_ubuntu_ami_id" {
  value = data.aws_ami.ubuntu
}
output "vps_public_ip"{
  description = "Public IP address of the server"
  value = aws_instance.my_web_server.public_ip
}
output "vps_id" {
  description = "the unique id of the server"
  value = aws_instance.my_web_server.id
}