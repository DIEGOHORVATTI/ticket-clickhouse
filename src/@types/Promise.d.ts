interface Promise<T> {
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?: ((reason: TResult) => TResult | PromiseLike<TResult>) | undefined | null
  ): Promise<T | TResult>
}
