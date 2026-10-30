#Portfolio 5: Exercise with Distributed and Cloud Databases
 ## Course Information
- Course Code: MIT 8103
- Course Title: Advanced Database Systems
- Case Study: Library Management System
## 1. Introduction
This portfolio shows how to use MongoDB Atlas to establish a cloud-hosted database for the Library Management System created in the earlier portfolios.
## 2. Cloud Database Deployment
The database was deployed using MongoDB Atlas on the Free (M0) cluster tier.
Details of Deployment
-Cluster Name: Loud LibraryCluster 
-Region: Cape Town, South Africa 
-Provider: AWS
-Tier of Cluster: M0 (Free)
This shows the setup of a cloud database without the need to install database servers locally.
## 3. Distributed Database Concepts
-Replication
The Atlas deployment uses a 3-node replica set. A replica set maintains multiple copies of the database across different nodes, helping improve data availability and resilience if one node becomes unavailable.
-Sharding
Sharding To accommodate heavier workloads, sharding divides data among several servers. Since the Free (M0) cluster is adequate for the existing Library Management System, sharding was not configured for this project.
Availability
Database availability can be improved by hosting the database on MongoDB Atlas, which provides replica set support and managed cloud infrastructure.
## 4. Backup Status
Backup: Inactive is displayed by the cluster. This is expected for the MongoDB Atlas Free (M0) tier and has no effect on the portfolio's practical implementation.
## 5. Practical Evidence
The implementation includes:
-MongoDB Atlas cloud deployment
-AWS hosting in the Cape Town region
-3-node replica set
-Configuration screenshot
## 6. Conclusion
This exercise demonstrates how a Library Management System can be hosted on a cloud database platform using MongoDB Atlas. The project also introduced distributed database concepts, including replication, cloud deployment, and availability.
