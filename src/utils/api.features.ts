export class APIFeatures {
    mongooseQuery: any;
    queryString: any;

    constructor(mongooseQuery: any, queryString: any) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedField = ['page', 'sort', 'limit', 'fields', 'populate'];
        excludedField.forEach((fields) => {
            delete queryObj[fields];
        });

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|eq)\b/g, (match) => `$${match}`);
        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.buildSortOptions();
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort('-created');
        }
        return this;
    }

    limit() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.select(fields);
        } else {
            this.mongooseQuery = this.mongooseQuery.select('-__v');
        }
        return this;
    }

    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        return this;
    }

    buildSortOptions() {
        const { sort } = this.queryString;
        let order = undefined;
        try {
            if (sort) {
                let elements = sort.split(',');
                elements = elements.map((element: string) => {
                    let keyValue = element.split(':');
                    keyValue = keyValue.map((item: string) => {
                        return `"${item}"`;
                    });
                    return keyValue.join(':');
                });
                elements = elements.join(',');
                const orderObject = JSON.parse(`{${elements}}`);
                order = orderObject;
            }
        } catch (error) {
            if (order == 'asc' || order == 'desc') {
                order = { "createdAt": order };
            }
        }
        return order;
    }

    populate(defaultPopulation?: any) {
        let populate = this.getPopulationFromQuery() ?? defaultPopulation;
        console.log(populate);
        if (populate) {
            this.mongooseQuery.populate(populate);
        }
        return this;
    }

    getPopulationFromQuery(): [] | null {
        let population = null;
        const { populate } = this.queryString;
        try {
            if (populate) {
                let elements = populate.split(',');
                if (Array.isArray(elements)) {
                    population = elements;
                    if (elements[0] == 'none') population = [];
                }
            }
        } catch (error) {
            console.log(error.message);
        }
        return population;
    }
}