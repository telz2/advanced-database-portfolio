Distributed and Cloud Database Notes

1. Database Architecture

The Library Management System uses MongoDB Atlas as its cloud database platform.

Architecture Diagram

flowchart TD
    A[Library Users] --> B[Library Management Application]
    B --> C[MongoDB Atlas - AWS Cape Town]
    C --> D[LibraryCluster - M0 Free]
    D --> E[3-Node Replica Set]
    E --> F[Library Database]
    F --> G[Books Collection]

2. Replication

Replication involves maintaining copies of database data across multiple nodes. The three-node replica set in the Atlas cluster supports data redundancy and availability.

3. Sharding

Sharding divides a large database across multiple servers. It can improve scalability when an application has large amounts of data or heavy workloads. Sharding was not configured in this project.

4. Cloud Deployment

The database was deployed through MongoDB Atlas using AWS as the cloud provider and Cape Town as the selected region. The deployment demonstrates the use of a managed cloud database service.

5. Backup Observation

The Atlas dashboard displayed Backup as Inactive. Automatic backup was therefore not demonstrated as part of this project.

6. Conclusion

The exercise provided practical experience with cloud database deployment and introduced distributed database concepts such as replication, availability, and sharding.
