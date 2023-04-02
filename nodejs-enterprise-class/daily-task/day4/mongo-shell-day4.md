1. 指定其中一個 `_id` ，並將該筆 document 的 `group` 改為 `D`
    1. updateOne,"$set"
    
    ```json
    db.students.updateOne({"_id":ObjectId("6429748e9e117b1fe969f422")},{"$set":{"group":"D"}})
    ```
    
2. 將 `group` 為 `B` 的多筆 document 的 `isPaid` 改為 `true`
    1. updateMany
    
    ```json
    db.students.updateMany({"group":"B"},{"$set":{"isPaid":true}})
    ```
    
3. 將 `studentName` 包含關鍵字 `Brennan` 的 document 刪除
    - $in
        
        ```json
        db.students.deleteMany({
            "studentName": {
                $in: ["Brennan"]
            }
        })
        ```
        
    - $in→result
        
        ```json
        { acknowledged: true, deletedCount: 0 }
        ```
        
    - $regex
        
        ```json
        db.students.deleteMany({
            "studentName": {
                "$regex": ".*Brennan.*"
            }
        })
        ```
        
    - $regex→result
        
        ```json
        { acknowledged: true, deletedCount: 1 }
        ```
        
4. 將 `isPaid` 為 `true` 的多筆 document 刪除
    1. deleteMany
    
    ```json
    db.students.deleteMany({"isPaid":true})
    ```