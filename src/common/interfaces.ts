export interface RecordsInDay {
    1: RecordItemData
    2: RecordItemData
    3: RecordItemData
    4: RecordItemData
}

export interface RecordItemData {
    id: string
    time: string
    comment: string
    cost: number
}