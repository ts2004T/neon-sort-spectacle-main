
import { ArrayElement } from '../components/SortingVisualizer';

type SetArrayFunction = React.Dispatch<React.SetStateAction<ArrayElement[]>>;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const updateArrayState = async (
  setArray: SetArrayFunction,
  updates: { index: number; state: ArrayElement['state'] }[],
  delay: number
) => {
  setArray(prev => {
    const newArray = [...prev];
    updates.forEach(({ index, state }) => {
      if (newArray[index]) {
        newArray[index] = { ...newArray[index], state };
      }
    });
    return newArray;
  });
  await sleep(delay);
};

const swapElements = async (
  array: ArrayElement[],
  setArray: SetArrayFunction,
  i: number,
  j: number,
  delay: number
) => {
  // Highlight elements being swapped
  await updateArrayState(setArray, [
    { index: i, state: 'swapping' },
    { index: j, state: 'swapping' }
  ], delay);

  // Perform the swap
  setArray(prev => {
    const newArray = [...prev];
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    return newArray;
  });
  
  await sleep(delay);

  // Reset states
  await updateArrayState(setArray, [
    { index: i, state: 'default' },
    { index: j, state: 'default' }
  ], delay / 2);
};

export const bubbleSort = async (
  array: ArrayElement[],
  setArray: SetArrayFunction,
  delay: number
) => {
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Highlight comparing elements
      await updateArrayState(setArray, [
        { index: j, state: 'comparing' },
        { index: j + 1, state: 'comparing' }
      ], delay);

      if (arr[j].value > arr[j + 1].value) {
        await swapElements(arr, setArray, j, j + 1, delay);
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      } else {
        await updateArrayState(setArray, [
          { index: j, state: 'default' },
          { index: j + 1, state: 'default' }
        ], delay / 2);
      }
    }
    
    // Mark the last element as sorted
    await updateArrayState(setArray, [{ index: n - i - 1, state: 'sorted' }], delay / 2);
  }
  
  // Mark first element as sorted
  await updateArrayState(setArray, [{ index: 0, state: 'sorted' }], delay / 2);
};

export const selectionSort = async (
  array: ArrayElement[],
  setArray: SetArrayFunction,
  delay: number
) => {
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    await updateArrayState(setArray, [{ index: i, state: 'comparing' }], delay);

    for (let j = i + 1; j < n; j++) {
      await updateArrayState(setArray, [{ index: j, state: 'comparing' }], delay);
      
      if (arr[j].value < arr[minIdx].value) {
        if (minIdx !== i) {
          await updateArrayState(setArray, [{ index: minIdx, state: 'default' }], delay / 2);
        }
        minIdx = j;
      } else {
        await updateArrayState(setArray, [{ index: j, state: 'default' }], delay / 2);
      }
    }

    if (minIdx !== i) {
      await swapElements(arr, setArray, i, minIdx, delay);
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    
    await updateArrayState(setArray, [{ index: i, state: 'sorted' }], delay / 2);
  }
  
  await updateArrayState(setArray, [{ index: n - 1, state: 'sorted' }], delay / 2);
};

export const insertionSort = async (
  array: ArrayElement[],
  setArray: SetArrayFunction,
  delay: number
) => {
  const arr = [...array];
  const n = arr.length;

  await updateArrayState(setArray, [{ index: 0, state: 'sorted' }], delay);

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    
    await updateArrayState(setArray, [{ index: i, state: 'comparing' }], delay);

    while (j >= 0 && arr[j].value > key.value) {
      await updateArrayState(setArray, [
        { index: j, state: 'swapping' },
        { index: j + 1, state: 'swapping' }
      ], delay);

      arr[j + 1] = arr[j];
      setArray(prev => {
        const newArray = [...prev];
        newArray[j + 1] = arr[j];
        return newArray;
      });
      
      await sleep(delay);
      j--;
    }
    
    arr[j + 1] = key;
    setArray(prev => {
      const newArray = [...prev];
      newArray[j + 1] = key;
      return newArray;
    });

    await updateArrayState(setArray, [{ index: j + 1, state: 'sorted' }], delay);
  }
};

const merge = async (
  arr: ArrayElement[],
  setArray: SetArrayFunction,
  left: number,
  mid: number,
  right: number,
  delay: number
) => {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    await updateArrayState(setArray, [
      { index: k, state: 'comparing' }
    ], delay);

    if (leftArr[i].value <= rightArr[j].value) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    
    setArray(prev => {
      const newArray = [...prev];
      newArray[k] = arr[k];
      return newArray;
    });
    k++;
  }

  while (i < leftArr.length) {
    await updateArrayState(setArray, [{ index: k, state: 'comparing' }], delay);
    arr[k] = leftArr[i];
    setArray(prev => {
      const newArray = [...prev];
      newArray[k] = arr[k];
      return newArray;
    });
    i++;
    k++;
  }

  while (j < rightArr.length) {
    await updateArrayState(setArray, [{ index: k, state: 'comparing' }], delay);
    arr[k] = rightArr[j];
    setArray(prev => {
      const newArray = [...prev];
      newArray[k] = arr[k];
      return newArray;
    });
    j++;
    k++;
  }
};

const mergeSortHelper = async (
  arr: ArrayElement[],
  setArray: SetArrayFunction,
  left: number,
  right: number,
  delay: number
) => {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    
    await mergeSortHelper(arr, setArray, left, mid, delay);
    await mergeSortHelper(arr, setArray, mid + 1, right, delay);
    await merge(arr, setArray, left, mid, right, delay);
  }
};

export const mergeSort = async (
  array: ArrayElement[],
  setArray: SetArrayFunction,
  delay: number
) => {
  const arr = [...array];
  await mergeSortHelper(arr, setArray, 0, arr.length - 1, delay);
};

const partition = async (
  arr: ArrayElement[],
  setArray: SetArrayFunction,
  low: number,
  high: number,
  delay: number
): Promise<number> => {
  const pivot = arr[high];
  
  await updateArrayState(setArray, [{ index: high, state: 'pivot' }], delay);
  
  let i = low - 1;

  for (let j = low; j < high; j++) {
    await updateArrayState(setArray, [{ index: j, state: 'comparing' }], delay);
    
    if (arr[j].value < pivot.value) {
      i++;
      if (i !== j) {
        await swapElements(arr, setArray, i, j, delay);
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    
    await updateArrayState(setArray, [{ index: j, state: 'default' }], delay / 2);
  }
  
  await swapElements(arr, setArray, i + 1, high, delay);
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
  await updateArrayState(setArray, [{ index: high, state: 'default' }], delay / 2);
  
  return i + 1;
};

const quickSortHelper = async (
  arr: ArrayElement[],
  setArray: SetArrayFunction,
  low: number,
  high: number,
  delay: number
) => {
  if (low < high) {
    const pi = await partition(arr, setArray, low, high, delay);
    
    await Promise.all([
      quickSortHelper(arr, setArray, low, pi - 1, delay),
      quickSortHelper(arr, setArray, pi + 1, high, delay)
    ]);
  }
};

export const quickSort = async (
  array: ArrayElement[],
  setArray: SetArrayFunction,
  delay: number
) => {
  const arr = [...array];
  await quickSortHelper(arr, setArray, 0, arr.length - 1, delay);
};

export const sortingAlgorithms = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort
};
