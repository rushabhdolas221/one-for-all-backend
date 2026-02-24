const Property = require("../models/property.model");

exports.getAllProperties = async (query) => {
  const {
    page = 1,
    limit = 10,
    minPrice,
    maxPrice,
    location,
    propertyType,
    search,
    sort = "-createdAt"
  } = query;

  // Build filter object
  const filter = {};

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (location) {
    filter.location = { $regex: location, $options: "i" };
  }

  if (propertyType) {
    filter.propertyType = propertyType;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
  }

  const skip = (page - 1) * limit;

  const [properties, total] = await Promise.all([
    Property.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .populate("owner", "name email role"),
    Property.countDocuments(filter)
  ]);

  return {
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    results: properties.length,
    data: properties
  };
};
