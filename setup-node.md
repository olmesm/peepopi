# Setup Node on Raspberry Pi

Node does add a significant amount of time to initialize a shell session, I am not sure if this is due to NVM and Node, or just Node itself.

NVM handles finding the best node version for your Pi - something I could not find good, consistent, recent or relevant info on.

You could also get node from Node directly but NVM just makes life a little easier.

## Get NVM

```bash
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.6/install.sh | bash
sudo reboot
```

## Install node

```bash
nvm install node
sudo reboot

node -v
v7.x.x (v7.6.0 at time of writing)
```

## Add local node modules to path

```bash
echo 'export PATH="./node_modules/.bin:$PATH"' >> /home/pi/.bashrc
sudo reboot # can also "source .bashrc"
```
