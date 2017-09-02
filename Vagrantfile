# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
    # Start with base vagrant box. This one is only 271 MB in size.
    config.vm.box = "bento/ubuntu-16.04"

    # Create forwarding ports for client-guest machine access via localhost.
    # auto_correct allows the simultaneous spin up of multiple VM locally.
    config.vm.network :forwarded_port, guest: 8080, host: 8080, auto_correct: true
    config.vm.network :forwarded_port, guest: 27017, host: 27017, auto_correct: true
    config.vm.network :forwarded_port, guest: 27018, host: 27018, auto_correct: true

    # Add the tty fix as mentioned in issue 1673 on vagrant repo
    # To avoid 'stdin is not a tty' messages
    # vagrant provisioning in shell runs bash -l
    config.vm.provision "fix-no-tty", type: "shell" do |s|
        s.privileged = false
        s.inline = "sudo sed -i '/tty/!s/mesg n/tty -s \\&\\& mesg n/' /root/.profile"
    end

    # Provision the virtual machine.
    config.vm.provision :shell, :path => "provision.sh"
end
0
