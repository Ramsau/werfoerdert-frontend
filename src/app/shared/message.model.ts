export class Message {
  constructor(
    public text: string,
    public type: 'INFO' | 'ERROR' | 'SUCCESS' | 'WARN',
    public timestamp: number
  ) {  }

  static info(text: string): Message {
    return new Message(text, 'INFO', +new Date());
  }

  static error(text: string): Message {
    return new Message(text, 'ERROR', +new Date());
  }

  static success(text: string): Message {
    return new Message(text, 'SUCCESS', +new Date());
  }

  static warn(text: string): Message {
    return new Message(text, 'WARN', +new Date());
  }
}
