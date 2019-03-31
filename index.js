
module.exports = class Arboleda {
  constructor (content = null) {
    this._parent = null
    this._content = content
    this._children = []
  }

  getParent () {
    return this._parent
  }

  getChildren () {
    return this._children
  }

  isRoot () {
    return this.getParent() === null
  }

  isLeave () {
    return this.getChildren().length === 0
  }

  setContent (content = {}) {
    this._content = content
  }

  getContent () {
    return this._content
  }

  setParent (node) {
    if (!(node instanceof Arboleda)) {
      throw new Error('Parent MUST BE instance of Arboleda')
    }

    this._parent = node
  }
}
