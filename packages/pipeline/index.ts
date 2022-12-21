type Fn<T> = (payload?: T) => unknown;

export class Emmitter<T>{
  private pool: Map<string, Set<Fn<T>>>
  constructor() {
    this.pool = new Map()
  }

  on(type: string, fn: Fn<T>) {
    const typeSet = this.pool.get(type)
    if (!typeSet) {
      this.pool.set(type, new Set([fn]))
    } else {
      typeSet.add(fn)
    }
  }

  once(type: string, fn: Fn<T>) {
    const onceModifierFn = () => {
      fn()
      this.pool.get(type).delete(fn)
    }
    this.on(type, onceModifierFn)
  }

  emit(type: string, payload?: T) {
    this.pool.get(type)?.forEach(fn => fn(payload))
  }

}

enum TaskStatus {
  IDEL = 'IDEL',
  DOING = 'DOING',
  DONE = 'DONE',
  FAIL = 'FAIL'
}

type TaskStatusType = `${TaskStatus}`

interface TaskConfig {
  // 失败是终止还是继续
  failHandler: 'ignore' | 'terminate';
  // 失败尝试的次数
  retry: number;
  // 失败了怎么做
  fallback: any;
  // 是否执行
  exec: boolean;
  // 缓存时间，-1 永久，0不缓存
  cacheTime: number;
}

export class Task<C, T> extends Emmitter<T>{
  private status: TaskStatusType;
  private retried: number;
  constructor(private name: string, private cb: Fn<C>, private config?: Partial<TaskConfig>) {
    super()
    this.status = TaskStatus.IDEL
    this.retried = 0;
    this.config = {
      failHandler: 'terminate',
      retry: 0,
      exec: true,
      cacheTime: 0,
      ...this.config
    }
  }

  on(type: TaskStatusType, fn: Fn<T>): void {
    super.on(type,fn)
  }

  once(type: TaskStatusType, fn: Fn<T>): void {
    super.on(type,fn)
  }

  emit(type: TaskStatusType, payload?: T): void {
    super.emit(type,payload)
  }

  run(context: C) {
    this.status = TaskStatus.DOING
    this.emit(TaskStatus.DOING, { name: this.name, progress: 0 } as T)
    Promise.resolve(this.cb(context)).then((res) => {
      this.status = TaskStatus.DONE
      this.emit(TaskStatus.DONE, res as T)
    }).catch(e => {
      if (this.retried++ < this.config.retry) {
        return this.run(context)
      }
      this.status = TaskStatus.FAIL;
      switch (this.config.failHandler) {
        case 'terminate':
          this.emit(TaskStatus.FAIL, e)
          break;
        case 'ignore':
          this.emit(TaskStatus.DONE, e)
          break
        default:
          break
      }
    })
  }
}