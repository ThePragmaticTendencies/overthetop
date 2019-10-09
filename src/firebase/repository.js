export class Repository {
  constructor(dbRef) {
    this._listeners = []
    this._dbRef = dbRef
  }

  disconnect(){
    this._listeners.forEach((listener) => {
      this._dbRef.off(listener.type, listener.callback)
    })

    this._listeners = []
  }

  _registerListener(callback, type) {
    this._listeners.push({callback: callback, type: type})
  }

  _getDbRefFor(childName) {
    return this._dbRef.child(childName)
  }

  _attachActionToChildDb(childName, type, action) {
    let callback = this._dbRef.child(childName)
    .orderByKey()
    .on(type, (snap) => {
      action(snap)
    })

    this._registerListener(callback, type)
  }
}

export class SpendingRepository extends Repository {
  constructor(dbRef, userId) {
    super(dbRef)
    this.userID = userId
    this.spendingsChildName = `${userId}_spendings`
    this.categoriesChildName = 'category'
  }

  attachToSpendings(action) {
    this._attachActionToChildDb(this.spendingsChildName, 'child_added', action)
  }

  attachToCategories(action) {
    this._attachActionToChildDb('category', 'child_added', action)
  }

  addSpending(spending) {
    let dateTimeKey = Date.now()
    return this._getDbRefFor(`${this.spendingsChildName}/${dateTimeKey}`)
      .set(spending)
  }

  deleteSpending(id) {
    return this._getDbRefFor(`${this.spendingsChildName}/${id}`)
      .remove()
  }

  updateSpending(id, spending) {
    return this._getDbRefFor(`${this.spendingsChildName}/${id}`)
      .set(spending)
  }

  addCategory(category) {
    return this._getDbRefFor(`${this.categoriesChildName}/${category.name}`)
      .set(category)
  }

  updateCategory(id, spending) {

  }
}
