import type { InjectionKey, Ref } from 'vue'

export const appInfoKey: InjectionKey<Ref<{
  toc: [{ id: string, text: string }] | null
  tocLinkTitle?: string
}>> = Symbol('app-info')
