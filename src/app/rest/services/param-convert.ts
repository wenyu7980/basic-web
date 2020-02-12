export class ParamConvert {
  static convert(param: any): { [key: string]: string } {
    const ret: { [key: string]: string } = {};
    for (const key of Object.keys(param)) {
      if (param[key] !== null) {
        ret[key] = param[key].toString();
      }
    }
    return ret;
  }
}
