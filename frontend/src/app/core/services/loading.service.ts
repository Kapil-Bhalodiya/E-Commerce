import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false)
  private loadingMap = new Map<string, boolean>()

  get isLoading$(): Observable<boolean> {
    return this.loadingSubject.asObservable()
  }

  setLoading(loading: boolean, key?: string): void {
    if (key) {
      this.loadingMap.set(key, loading)
      const hasAnyLoading = Array.from(this.loadingMap.values()).some(value => value)
      this.loadingSubject.next(hasAnyLoading)
    } else {
      this.loadingSubject.next(loading)
    }
  }

  isLoadingFor(key: string): boolean {
    return this.loadingMap.get(key) || false
  }
}