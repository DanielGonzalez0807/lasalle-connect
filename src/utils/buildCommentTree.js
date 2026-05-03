/**
 * Transforma una lista plana de comentarios en un árbol jerárquico.
 * Cada nodo recibe una propiedad `replies` con sus hijos directos.
 * Complejidad: O(n) — un solo recorrido con un Map.
 *
 * @param {Array} comments - Lista plana ordenada por created_at asc
 * @returns {Array} - Comentarios raíz con replies anidados
 */
export function buildCommentTree(comments) {
  const map = new Map()
  const roots = []

  for (const comment of comments) {
    map.set(comment.id, { ...comment, replies: [] })
  }

  for (const comment of map.values()) {
    if (comment.parent_id === null) {
      roots.push(comment)
    } else {
      const parent = map.get(comment.parent_id)
      if (parent) parent.replies.push(comment)
    }
  }

  return roots
}

/**
 * Inserta un nuevo comentario en el árbol sin mutar el original.
 * Si parent_id es null, lo agrega como raíz.
 * Si tiene parent_id, lo agrega a replies del padre correspondiente.
 *
 * @param {Array} tree - Árbol actual
 * @param {Object} newComment - Comentario nuevo con replies: []
 * @returns {Array} - Nuevo árbol con el comentario insertado
 */
export function insertIntoTree(tree, newComment) {
  if (newComment.parent_id === null) {
    return [...tree, { ...newComment, replies: [] }]
  }

  return tree.map((node) => {
    if (node.id === newComment.parent_id) {
      return { ...node, replies: [...node.replies, { ...newComment, replies: [] }] }
    }
    if (node.replies.length > 0) {
      return { ...node, replies: insertIntoTree(node.replies, newComment) }
    }
    return node
  })
}
