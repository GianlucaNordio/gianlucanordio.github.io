---
title: Robust AMR localization in dynamic industrial environments
year: 2026
description: A 2D-lidar map updater that keeps AMCL localization reliable when the warehouse changes.
tech: [ROS 1, Python, C++, Gazebo, Docker]
repo: https://github.com/GianlucaNordio/Robust_AMR_Localization
featured: true
---

My MSc thesis at DTU Electro, in collaboration with Robotize. Mobile robots that localize with AMCL rely on a static occupancy grid map, and that map goes stale as pallets and boxes are moved around the site.

The contribution is a map updater for 2D lidar: it classifies each laser beam against the static map, filters irregular obstacles, tracks box-shaped objects and publishes an updated map in which added and removed objects are incorporated. The repository includes a suite of 100 simulated warehouse scenarios and the tooling to run the updater on a real robot.
