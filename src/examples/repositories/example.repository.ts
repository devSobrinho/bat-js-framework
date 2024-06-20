import { Injectable } from "@/common/decorators/injectable.decorator";

@Injectable()
export class ExampleRepository {
  // constructor(public connection: Connection) {}

  get(data: any) {
    return {
      message: "ExampleRepository get",
      data,
      // connection: this.connection.getRepository(),
    };
  }

  post() {
    return "ExampleRepository post";
  }

  put() {
    return "ExampleRepository put";
  }

  delete() {
    return "ExampleRepository delete";
  }
}

@Injectable()
export class Connection {
  constructor() {
    // console.log("Connection constructor");
  }

  connect() {
    return "Connection connect";
  }

  disconnect() {
    return "Connection disconnect";
  }

  getRepository() {
    return "Connection getRepository";
  }
}
