var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SpecificDay = new Schema(
  {
    day: {
      type: String,
      required: true,
    },
    schedule: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
var tableSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    
    tableName: {
      type: String,
      required: true,
    },
    
    edit_access: [mongoose.Schema.Types.ObjectId],
    view_access: [mongoose.Schema.Types.ObjectId],
    table: [SpecificDay],
  },
  {
    timestamps: true,
  }
);

var Table = mongoose.model("Table", tableSchema);
module.exports = Table;
