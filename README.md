# 📊 StatusBoard: Automated MERN Infrastructure & Observability

## 📺 Project Demo
Watch the full 6-minute video walkthrough of the infrastructure deployment and live k6 load test:  
👉 [Click here to watch the 6-minute project demo on YouTube!](https://youtu.be/DNPnzdKycZQ)

## 🚀 Overview
StatusBoard is a full-stack MERN (MongoDB, Express, React, Node.js) application deployed on an AWS EC2 instance. This project demonstrates a complete DevOps lifecycle, focusing on **Infrastructure as Code (IaC)**, **Configuration Management**, and **System Observability**.

## 🏗️ Architecture & Tech Stack
* **Cloud Provider:** AWS (EC2 `t3.small` in Mumbai `ap-south-1`)
* **Infrastructure Provisioning:** Terraform
* **Configuration Management:** Ansible
* **Containerization:** Docker & Docker Compose
* **Reverse Proxy & SSL:** Caddy server with DuckDNS auto-HTTPS
* **Observability:** Prometheus, Grafana, Node Exporter, Blackbox Exporter
* **Load Testing:** k6

## 🛠️ Key Features
1. **Automated Provisioning:** Used Terraform to spin up the VPC, Security Groups (Least Privilege), and EC2 instances.
2. **Idempotent Setup:** Ansible playbooks automatically install Docker, configure user permissions, and establish a custom internal Docker network (`shared_network`).
3. **Secure Routing:** Caddy acts as a reverse proxy, automatically generating SSL certificates and routing traffic safely to the internal containers without exposing application ports directly.
4. **Live Monitoring:** Custom Grafana dashboards track system health (CPU, Memory) via Node Exporter and endpoint uptime/latency via Blackbox Exporter.

