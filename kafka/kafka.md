# create topic

`kafka-topics.bat -zookeeper 192.168.2.94:2181 -topic example2 -create -partitions 1 -replication-factor 1`

# created topics

`ui_inquiries_in`
`ui_inquiries_out`

`ui_offers_in`
`ui_offers_out`

#

`G:\kafka\bin\windows>kafka-server-start.bat ../../config/server.properties`

#

`G:\kafka\bin\windows>zookeeper-server-start.bat ../../config/zookeeper.properties`
