# Kweb

## Dependancies and environment

```bash
sudo reboot
sudo raspi-config
# > expand file system
sudo reboot
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install lxterminal tint2 xterm omxplayer  xinit xserver-xorg lxde unclutter -y
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

### Prevent mouse and Screen blanking

Alot of help [from this thread](https://www.raspberrypi.org/forums/viewtopic.php?f=91&t=147311)

Add the following 4 lines _directly below_ `#!/bin/sh`

```
#!/bin/sh
xset s off
xset -dpms
xset s noblank
unclutter -idle 0.5 -root & # mouse hidden on startup
...
```

The first three commands are to disable the screen blanking. The last line hides the mouse.

Again from the forum thread above, this seems to help with future fault finding.

```
xset -dpms
xset s noblank
xset s off
export DISPLAY=:0
xdg-screensaver status
```

There are also hidden comments in this page to try other things to prevent screen blanking.

### Set the right commands for kweb

From the manual, I changed bottom line to

```
kweb3 -HJK "http://pi-radio/"
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

## Prevent Screen Blanking/Screen Saver

```bash
sudo vi /etc/kbd/config
```

http://raspberrypi.stackexchange.com/a/23116

```
...
# BLANK_TIME=30 #DEFAULT
BLANK_TIME=0

...
BLANK_DPMS=off

...
# POWERDOWN_TIME=30 # DEFAULT
POWERDOWN_TIME=0
```
<!-- BELOW MAY NOT BE NEEDED AND DIDNT SEEM TO WORK -->
<!-- And...

```
sudo vi /etc/lightdm/lightdm.conf
```

Add the following lines to the [SeatDefaults] section:

```
# don't sleep the screen
xserver-command=X -s 0 dpms
```

[Thanks](http://www.raspberry-projects.com/pi/pi-operating-systems/raspbian/gui/disable-screen-sleep)

### Shotgun approach to disable screen blanking

Screen still seems to blank - will update this if I re-do all the steps and have time to fiddle.

If you have any of these files do the following - note if the file exists there will be text within vi.

No text no file - dont change or save!

```bash
sudo vi /etc/xdg/lxsession/LXDE/autostart
sudo vi /etc/xdg/lxsession/LXDE-pi/autostart
sudo vi ~/.config/lxsession/LXDE/autostart
```

To add:

```
# @xscreensaver -no-splash
@xset s off
@xset -dpms
@xset s noblank
```

Hopefully I can give [this dude](https://www.danpurdy.co.uk/web-development/raspberry-pi-kiosk-screen-tutorial/) the credit for above -->

## Start ktop on boot

```bash
sudo vi /etc/rc.local
```

Append to the bottom

https://www.raspberrypi.org/forums/viewtopic.php?f=91&t=147311

```
...
xinit /home/pi/ktop & # start ktop on boot
```

## Clean up

```
sudo apt-get clean
sudo apt-get autoclean
```

### Resources

* [Kweb Manual](http://steinerdatenbank.de/software/kweb_manual.pdf)
* [RPI Forum Kweb](https://www.raspberrypi.org/forums/viewtopic.php?t=40860)
