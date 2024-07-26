export const removeFields = (data: any[] | Object, fields: string[]): any[] | Object => {
  if (Array.isArray(data)) {
    return data.map((obj) => {
      const res = Object.assign({}, obj);
      fields.forEach((field) => {
        delete res[field];
      });
      delete res["$loki"]
      delete res["meta"]
      delete res.archive;
      return res;
    })
  }
  if (typeof data === "object") {
    const res = Object.assign({}, data);
    fields.forEach((field) => {
      delete res[field];
    });
    delete res["$loki"]
    delete res["meta"]
    delete res["archive"];
    return res;
  }
  return data;
};