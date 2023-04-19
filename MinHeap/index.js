/**
 * Class to represent a MinHeap which is a Priority Queue optimized for fast
 * retrieval of the minimum value. It is implemented using an array but it is
 * best visualized as a tree structure where each 'node' has left and right
 * children except the 'node' may only have a left child.
 * - parent is located at: Math.floor(i / 2);
 * - left child is located at: i * 2
 * - right child is located at: i * 2 + 1
 * 
    * ### When 0th index is _unused_

    - Parent is located at `Math.floor(i / 2);`.
    - Left child is located at `i * 2`.
    - Right child is located at `(i * 2) + 1`.

    ### When 0th index is _used_

    - Parent is located at `Math.floor((i - 1) / 2)`.
    - Left child is located at `(i * 2) + 1`.
    - Right child is located at `(i * 2) + 2`.
 */
class MinHeap {
    constructor() {
        /**
         * 0th index not used, so null is a placeholder. Not using 0th index makes
         * calculating the left and right children's index cleaner.
         * This also effectively makes our array start at index 1.
         */
        this.heap = [null];
    }

    /**
     * Retrieves the top (minimum number) in the heap without removing it.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {?number} Null if empty.
     */
    top() {
        return this.heap[1]
    }

    /**
     * Inserts a new number into the heap and maintains the heaps order.
     * 1. Push new num to back then.
     * 2. Iteratively swap the new num with it's parent while it is smaller than
     *    it's parent.
     * - Time: O(log n) logarithmic due to shiftUp / iterative swapping.
     * - Space: O(1) constant.
     * @param {number} num The num to add.
     */
    insert(num) {
        this.heap.push(num)

        let currentIdx = this.heap.length - 1
        let parentIdx = Math.floor((this.heap.length - 1) / 2)

        while (this.heap[currentIdx] < this.heap[parentIdx]) {
            // this.printHorizontalTree()
            [this.heap[currentIdx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[currentIdx]]

            // reset current to be the parent
            currentIdx = parentIdx
            // reset the parent to be the actual parent of the new current
            parentIdx = Math.floor((currentIdx) / 2)
        }
    }

    /**
   * Extracts the min num from the heap and then re-orders the heap to
   * maintain order so the next min is ready to be extracted.
   * 1. Save the first node to a temp var.
   * 2. Pop last node off and set idx1 equal to the popped value.
   * 3. Iteratively swap the old last node that is now at idx1 with it's
   *    smallest child IF the smallest child is smaller than it.
   * - Time: O(log n) logarithmic due to shiftDown.
   * - Space: O(1) constant.
   * @returns {?number} The min number or null if empty.
   */
    extract() {
        // nothing to remove
        if (this.heap.length === 1) {
            return null;
        }

        const heap = this.heap;
        const min = heap[1];
        const lastNode = heap.pop();

        // last item is being removed, no more work required
        if (heap.length === 1) {
            return min;
        }

        // last node is overwriting the idx 1 to "remove" idx 1
        heap[1] = lastNode;
        // since we put the lastNode at the start, it needs to be swapped down to it's correct position to restore the order
        this.shiftDown();
        return min;
    }

    // AKA: siftDown, heapifyDown, bubbleDown, sinkDown to restore order after extracting min
    shiftDown() {
        let idxOfNodeToShiftDown = 1;
        let idxOfLeftChild = this.idxOfLeftChild(idxOfNodeToShiftDown);

        // while there is at least 1 child
        while (idxOfLeftChild < this.heap.length) {
            const idxOfRightChild = this.idxOfRightChild(idxOfNodeToShiftDown);
            let idxOfSmallestChild = idxOfLeftChild;
            const isRightChildInBounds = idxOfRightChild < this.heap.length;

            // Don't compare right child if it's out of bounds.
            // less than or greater than undefined has weird behavior (always false).
            const isRightChildSmaller =
                isRightChildInBounds &&
                this.heap[idxOfRightChild] < this.heap[idxOfLeftChild];

            if (isRightChildSmaller) {
                idxOfSmallestChild = idxOfRightChild;
            }

            const isParentSmallerOrEqual =
                this.heap[idxOfNodeToShiftDown] <= this.heap[idxOfSmallestChild];

            // Parent is supposed to be smaller, so ordering is complete.
            if (isParentSmallerOrEqual) {
                break;
            }

            this.swap(idxOfNodeToShiftDown, idxOfSmallestChild);

            // after swapping the node is now at the idxOfSmallestChild.
            idxOfNodeToShiftDown = idxOfSmallestChild;
            idxOfLeftChild = this.idxOfLeftChild(idxOfNodeToShiftDown);
        }
    }

    /**
     * @param {number} i
     */
    idxOfLeftChild(i) {
        return i * 2;
    }

    /**
     * @param {number} i
     */
    idxOfRightChild(i) {
        return i * 2 + 1;
    }

    /**
   * Swaps two nodes.
   * @param {number} i
   * @param {number} j
   */
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }


    /**
     * Logs the tree horizontally with the root on the left and the index in
     * parenthesis using reverse inorder traversal.
     */

    printHorizontalTree(parentIdx = 1, spaceCnt = 0, spaceIncr = 10) {
        if (parentIdx > this.heap.length - 1) {
            return;
        }

        spaceCnt += spaceIncr;
        this.printHorizontalTree(parentIdx * 2 + 1, spaceCnt);

        console.log(
            " ".repeat(spaceCnt < spaceIncr ? 0 : spaceCnt - spaceIncr) +
            `${this.heap[parentIdx]} (${parentIdx})`
        );

        this.printHorizontalTree(parentIdx * 2, spaceCnt);
    }
}

const MH = new MinHeap()

MH.printHorizontalTree()

const list = [5, 3, 2, 7, 8, 23, 2, 3]

list.forEach(el => {
    MH.insert(el)
});

MH.printHorizontalTree()
console.log("******************")
MH.extract()
console.log("******************")
MH.printHorizontalTree()