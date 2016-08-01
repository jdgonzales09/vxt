# SchemaDraft

    Table Name: UsersAddresses
        Key Schema: [
            { AttributeName: "UserId", KeyType: "HASH"},
        ],
        AttributeDefinitions: [
            { AttributeName: "UserId", AttributeType: "S" }
        ],


# Database Layout

UserId
{
    "SavedAdresses" : [
        "label" : String,
        "AddressStreetNumber" : String,
        "AddressStreetName" : String,
        "AddressZipCode" : String,
        "createdON" : Date,
        "createdAt" : Time
    ]
    "HomeAddress" : [
        "HomeAddressStreetNumber" : String,
        "HomeAddressStreetName" : String,
        "HomeAddressZipCode" : String,
        "createdON" : Date,
        "createdAt" : Time
    ]
    "AddressHistory" : [
        "HistoricalAddressStreetNumber" : String,
        "HistoricalAddressStreetName" : String,
        "HistoricalAddressZipCode" : String,
        createdOn : Date,
        createdAt : Time
    ]
}

* Everything will get stored in Address History
