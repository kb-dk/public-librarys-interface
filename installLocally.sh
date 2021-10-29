#!/usr/bin/env bash

SCRIPT_DIR=$(dirname "$(readlink -f -- ${BASH_SOURCE[0]})")

set -e

pushd $SCRIPT_DIR > /dev/null

port=4200
shutdownPort=4206
debugPort=4276
appName=interlibraryloans

(mvn $1 clean package -Psbprojects-nexus -DskipTests=true) || exit 1

TOMCAT_VERSION=9.0.36
#TOMCAT_VERSION=8.5.51
wget -N "https://archive.apache.org/dist/tomcat/tomcat-$(echo $TOMCAT_VERSION | cut -d'.' -f1)/v$TOMCAT_VERSION/bin/apache-tomcat-$TOMCAT_VERSION.tar.gz"
[ -d "$SCRIPT_DIR/apache-tomcat-$TOMCAT_VERSION" ] || tar -xvzf "apache-tomcat-$TOMCAT_VERSION.tar.gz"

TOMCAT_HOME="$SCRIPT_DIR/apache-tomcat-$TOMCAT_VERSION"

sed -i "s/<Connector port=\"8080\"/<Connector port=\"$port\"/g" "$TOMCAT_HOME/conf/server.xml"
sed -i "s/<Server port=\"8005\" shutdown=\"SHUTDOWN\">/<Server port=\"$shutdownPort\" shutdown=\"SHUTDOWN\">/g" "$TOMCAT_HOME/conf/server.xml"

"$TOMCAT_HOME"/bin/shutdown.sh

rm -rf "$TOMCAT_HOME/webapps/"*
rm -rf "$TOMCAT_HOME/logs/"*

mkdir -p "$TOMCAT_HOME/conf/Catalina/localhost/"
cp -f "$SCRIPT_DIR/conf/local/$appName.xml" "$TOMCAT_HOME/conf/Catalina/localhost/$appName.xml"

sleep 5

export JAVA_HOME=${JAVA_HOME:-/usr/lib/jvm/java-11/}
export JAVA_OPTS="$JAVA_OPTS -Dproject.home=$SCRIPT_DIR"
export JPDA_ADDRESS="0.0.0.0:$debugPort"

exec $TOMCAT_HOME/bin/catalina.sh jpda run




