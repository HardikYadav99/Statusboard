sudo apt update

sudo apt install -y ansible

cd "/mnt/c/Users/sanga/Downloads/Video/1. YOUTUBE ENGLISH/2026/project/devops-advanced-full-course"

ansible prod -m ping

export ANSIBLE_CONFIG="$PWD/ansible.cfg"

ansible --version | sed -n '1,6p'

ls -la ~/.ssh

ssh-keygen -t ed25519 -a 64 -f ~/.ssh/id_ed25519 -C "devops-advanced-course-ansible"

ssh-copy-id -i ~/.ssh/id_ed25519.pub root@82.29.167.27

ssh -i ~/.ssh/id_ed25519 root@82.29.167.27

ansible_ssh_private_key_file=/root/.ssh/id_ed25519

http://82.29.167.27:5173
