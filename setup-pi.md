# Setup Raspbian lite

[Get Rasbian Lite](https://www.raspberrypi.org/downloads/raspbian/)

[Write the image](https://www.raspberrypi.org/documentation/installation/installing-images/linux.md)

## Personal Steps

The following may not work for you, it's more of a personal log of the steps taken to write to the SD.

*The SSH step is handy and probably required.*

```bash
df -h
umount /dev/mmcblk0p1
umount /dev/mmcblk0p2

cd ~/Downloads/
ls | grep <version-date-of-download> | grep img # replace whatever the date is on downloaded version
sudo dd bs=4M if=<version-date-of-download>-raspbian-jessie-lite.img of=/dev/mmcblk0
```

## SSH

You dont have to set up SSH if you have a TV, keyboard and mouse available. I don't have a keyboard.

When done writing the image, pull SD out then put it back in.
Open boot partition and create new blank file called `ssh`
