# Release notes
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).
---

# 2.2.0
- Bump package versions
- Code cleanup
- Added "Stats Table" screen
- Added loader spinner
- Update the color palette used on the map

# 2.1.0
- Added comprehensive analysis view
- Added individually statistics selector
- Added "About" screen
- Connected query APIs with [QoLI-Framework Service](https://github.com/iliedorobat/QoLI-Framework/tree/master/src/ro/webdata/qoli/server)
- Added info layer control
- Removed tooltip
- Implement responsive design

# 2.0.0
- Added years selector
- Added country selector
- Added tooltip selector
- Extended the selector of QoLI dimensions
- Split the "Leisure and Social Interaction" dimension into two distinct dimensions
- Used gray layers for countries which are filtered out and for those which are part of Europe but not EU
- Connected query APIs with [QoLI-Map-Service](https://github.com/iliedorobat/QoLI-Map-Service)

# 1.1.0
- Use lodash-es instead of lodash
- Standardize function definitions & types
- Remove deprecated ngModel directive
- Merge LayersService with AtlasService
- Enhance AtlasFilter (add PrimaryAtlasFilter)
- Rename LIFE_INDEX_ACCESSORS to LIFE_INDEX_CATEGORIES
- Rename LIFE_INDEX_INTERVAL to AVAILABLE_INTERVAL
- Rename LIFE_INDEX_END to MAX_YEAR
- Rename LIFE_INDEX_START to MIN_YEAR
- Add DEFAULT_YEAR
- Preserve the filter between states

# 1.0.0
- Initial commit
