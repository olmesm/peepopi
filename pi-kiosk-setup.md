# Kweb

## Dependancies and environment

```bash
sudo reboot
sudo raspi-config
# > expand file system
sudo reboot
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install lxterminal tint2 xterm omxplayer xinit xserver-xorg lxde -y
sudo reboot
```

You now need to prevent LXDE from starting on boot. SSH seems to lock up when LXDE starts for the first time. I was too lazy to get a keyboard out of my car, but I had a mouse lying around and managed the following.

Without keyboard:
Allow LXDE to sit for a minute. Then Click bottom right and restart.

With keyboard and Mouse:
Click bottom left for menu. Start a terminal session.

```bash
sudo raspi-config
# > boot-options
# >> Desktop/CLI
# >>> console (NO login)

sudo reboot
```

## Install Kweb

```bash
wget http://steinerdatenbank.de/software/kweb-1.7.7.tar.gz
tar -xzf kweb-1.7.7.tar.gz
cd kweb-1.7.7
./debinstall

# > Don't install youtube-dl

sudo reboot
```

## Setup Kweb for Kiosk mode

```bash
sudo vi ktop # use nano or whatever you prefer
```

From the manual, I changed bottom line to

```
...
kweb3 -HJK "http://google.com/"
```

| Change | Description |
|---|---|

| kweb3 | GTK3, uses HW acceleration. Only use this if running on a PI 2/3, otherwise leave it at kweb |
| H | Set as Home URL (possibly not needed) |
| J | Javascript Enabled |
| K | Kiosk mode |
| "http://google.com/" | Test if we can run a URL. |

## Run Kweb

```bash
sudo xinit ./ktop
```

## Fix resolution/overscan

```bash
sudo raspi-config
# > Advanced Options
# >> Overscan
# >>> No
# > Advanced Options
# >> Resolution
# >>> ............ # choose one that's appropriate for your TV.
# I chose 1280x720 60Hz (When I tried 50Hz, text was cut-off)
sudo reboot
```

## Clean up

```
sudo apt-get clean
sudo apt-get autoclean
```

### Resources

* [Kweb Manual](http://steinerdatenbank.de/software/kweb_manual.pdf)
* [RPI Forum Kweb](https://www.raspberrypi.org/forums/viewtopic.php?t=40860)
