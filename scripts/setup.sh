#!/bin/bash

if [ -z "$1" ]
then
	echo "Specify destination directory for project (full path)"
	exit 1
fi

test -e /var/www/spatoday || sudo mkdir --mode=777 /var/www/spatoday
sudo ln -s $1 /var/www/spatoday
sudo sh -c 'printf "127.0.0.1\tspatoday-local\n" >> /etc/hosts'

cat >/tmp/020-spatoday.conf <<DELIM
<VirtualHost *:80>
  ServerName spatoday-local
  ServerAdmin webmaster@localhost
  DocumentRoot /var/www/spatoday

  ErrorLog /var/log/spatoday/spatoday-error.log
  CustomLog /var/log/spatoday/spatoday-access.log combined

  DirectoryIndex index.html, index.php

  <Directory "/var/www/spatoday">
    Options Indexes FollowSymLinks
    AllowOverride All
    Order allow,deny
    Allow from all
  </Directory>
</VirtualHost>
DELIM
sudo mv /tmp/020-spatoday.conf /etc/apache2/sites-available/
sudo ln -s /etc/apache2/sites-available/020-spatoday.conf /etc/apache2/sites-enabled/
sudo a2enmod rewrite

test -e /var/log/spatoday || sudo mkdir --mode=777 /var/log/spatoday
test -e /var/lib/spatoday || sudo mkdir --mode=777 /var/lib/spatoday

../spatoday migrations:migrate

sudo service apache2 restart