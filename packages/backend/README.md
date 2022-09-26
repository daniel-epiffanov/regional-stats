Here is initial 1.0.0 version of backend.

The graphql access point is ```/api```


# Graphql backend description

```
    type AnnualDataItem {
        year: Int,
        value: Float,
        prettyValue: String,
        annualGrowthPercent: Float,
        totalGrowthPercent: Float,
        regionRank: Int,
    }
    type AnnualStatsItem {
        regionName: String,
        regionFlagUrl: String,
        measure: String,
        parentMeasure: String,
        annualData: [AnnualDataItem],
    }

    type AnnualStatsRating {
        regionName: String,
        regionRank: Int,
        regionFlagUrl: String,
        value: Float,
        prettyValue: String,
        paletteColor: String
    }

    type PointGeometry {
        type: String,
        coordinates: [Float],
    }
    
    type PointProperties {
        regionName: String,
        regionFlagUrl: String
    }
    
    type CoordsPoint {
        properties: PointProperties,
        geometry: PointGeometry
    }

    type PolygonGeometry {
        type: String,
        coordinates: [[[Float]]],
    }
    
    type PolygonProperties {
        regionName: String,
    }
    
    type CoordsPolygon {
        properties: PolygonProperties,
        geometry: PolygonGeometry
    }
    
    type Query {
        regionNames(regionType: String): [String],
        annualStatsYears: [Int],
        annualStatsMainCategoryNames: [String],
        annualStatsSubCategoryNames(mainCategoryName: String): [String],
        annualStats(
            regionType: String,
            mainCategoryName: String,
            subCategoryName: String,
            subSubCategoryName: String
        ): [AnnualStatsItem],
        annualStatsSubSubCategoryNames(
            mainCategoryName: String,
            subCategoryName: String
        ): [String],
        coordsPolygons(regionType: String): [CoordsPolygon],
        coordsPoints(regionType: String): [CoordsPoint],
        annualStatsRating(
            year: Int,
            mainCategoryName: String,
            subCategoryName: String,
            subSubCategoryName: String,
            regionType: String
        ): [AnnualStatsRating],
    }
```