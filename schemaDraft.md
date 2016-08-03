# SchemaDraft

    Table Name: UsersAddresses
        Key Schema: [
            { AttributeName: "UserId", KeyType: "HASH" },
        ],
        AttributeDefinitions: [
            { AttributeName: "UserId", AttributeType: "S" }
        ],


# Database Layout

UserId
{
    "UsedAdresses" : [
        "label" : S,
        "AddressStreetNumber" : S,
        "AddressStreetName" : S,
        "AddressCity" : S,
        "AddressState" : S,
        "AddressZipCode" : S,
        "api": {},
        "apiURL": S,
        "createdON" : S,
        "lastUsed" : S,
        "numberOfTimesUsed" : N
    ],
    "TravelTimes" : [

    ]
}

* Everything will get stored in Address History
* Pull database entry from
