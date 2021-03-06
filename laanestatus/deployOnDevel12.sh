#!/usr/bin/env bash

SCRIPT_DIR=$(dirname "$(readlink -f -- "${BASH_SOURCE[0]}")")

set -e

#port range 9010-9019
#9010: Tomcat shutdown
#9011: Tomcat http
#9019: tomcat debug

develServer=devel12.statsbiblioteket.dk
user="almalile" #ALMA LIbrary LEnding
devel="$user@${develServer}"
projectBaseUrl=laanestatus
projectName=$(basename "$SCRIPT_DIR")
tomcatHttpPort=9011
tomcatDebugPort=9019
build=full
version=$(mvn org.apache.maven.plugins:maven-help-plugin:2.1.1:evaluate -Dexpression=project.version -Psbprojects-nexus | sed -n -e '/^\[.*\]/ !{ /^[0-9]/ { p; q } }')

#Build

if [ $build == "fast" ]; then
    #Fast
    (
        mvn $1 package -Psbprojects-nexus -DskipTests=true
    ) || exit 1
else
    # Extensive
    (
        cd "$SCRIPT_DIR/"..
        pwd
        mvn $1 package -Psbprojects-nexus -DskipTests=true --also-make --projects "$(basename "$SCRIPT_DIR")"
    ) || exit 1
fi

set -x
#install
rsync -av "$SCRIPT_DIR/target/${projectName}-${version}.war" "${devel}:services/tomcat-apps/${projectName}.war"
rsync -av "$SCRIPT_DIR/conf" --exclude='*-local.yaml' --exclude "/**/**/" "${devel}:services/"
rsync -av "$SCRIPT_DIR/conf/devel12/" "${devel}:services/conf/"
rsync -av "$SCRIPT_DIR/conf/devel12/${projectBaseUrl}.xml" "${devel}:tomcat/conf/Catalina/localhost/${projectBaseUrl}.xml"

echo "Stopping tomcat"
ssh "${devel}"  "(source .bash_profile && ~/bin/\$USER-tomcat.sh stop | grep 'tomcat is not running') || sleep 10"
echo "Tomcat stopped"

echo "Starting tomcat"
ssh "${devel}" "(source .bash_profile; export JPDA_ADDRESS='0.0.0.0:${tomcatDebugPort}'; ~/bin/\$USER-tomcat.sh jpda start)"



echo "${projectName}.war deployed to ${develServer}:  http://${develServer}:${tomcatHttpPort}/${projectBaseUrl}"
