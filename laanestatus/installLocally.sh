#!/usr/bin/env bash

SCRIPT_DIR=$(dirname "$(readlink -f -- ${BASH_SOURCE[0]})")

set -e

pushd $SCRIPT_DIR > /dev/null

port=4200
shutdownPort=4206
debugPort=4276
projectBaseUrl=laanestatus
projectName=$(basename "$SCRIPT_DIR")

version=$(mvn org.apache.maven.plugins:maven-help-plugin:2.1.1:evaluate -Dexpression=project.version -Psbprojects-nexus | sed -n -e '/^\[.*\]/ !{ /^[0-9]/ { p; q } }')

#Fast
#(mvn $1 package -Psbprojects-nexus -DskipTests=true) || exit 1
# Extensive
(cd "$SCRIPT_DIR/"..; pwd; mvn $1 package -Psbprojects-nexus -DskipTests=true --also-make --projects "$(basename "$SCRIPT_DIR")") || exit 1

TOMCAT_VERSION=9.0.36


#TOMCAT_VERSION=8.5.51
wget -N "https://archive.apache.org/dist/tomcat/tomcat-$(echo $TOMCAT_VERSION | cut -d'.' -f1)/v$TOMCAT_VERSION/bin/apache-tomcat-$TOMCAT_VERSION.tar.gz"
[ -d "$SCRIPT_DIR/apache-tomcat-$TOMCAT_VERSION" ] || tar -xvzf "apache-tomcat-$TOMCAT_VERSION.tar.gz"

TOMCAT_HOME="$SCRIPT_DIR/apache-tomcat-$TOMCAT_VERSION"

#set -x
sed -i "s/<Connector port=\"[0-9]\+\"/<Connector port=\"$port\"/g" "$TOMCAT_HOME/conf/server.xml"
sed -i "s/<Server port=\"[0-9]\+\" shutdown=\"SHUTDOWN\">/<Server port=\"$shutdownPort\" shutdown=\"SHUTDOWN\">/g" "$TOMCAT_HOME/conf/server.xml"
#set +x

"$TOMCAT_HOME"/bin/shutdown.sh

rm -rf "$TOMCAT_HOME/webapps/"*
rm -rf "$TOMCAT_HOME/logs/"*

mkdir -p "$TOMCAT_HOME/conf/Catalina/localhost/"
cp -f "$SCRIPT_DIR/conf/local/${projectBaseUrl}.xml" "$TOMCAT_HOME/conf/Catalina/localhost/${projectBaseUrl}.xml"

sleep 5

export JAVA_HOME=${JAVA_HOME:-/usr/lib/jvm/java-11/}
export JAVA_OPTS="$JAVA_OPTS -Dproject.home=$SCRIPT_DIR -Dproject.version=$version"
export JPDA_ADDRESS="0.0.0.0:$debugPort"

exec $TOMCAT_HOME/bin/catalina.sh jpda run




