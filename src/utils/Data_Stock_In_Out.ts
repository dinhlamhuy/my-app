export interface Stock_Out {
    Stock_In_Out_Serial: string;
    Material_Label_Serial: string;
    Barcode: string;
    Stock_In_Out_Status: string;
    Stock_In_No: string;
    Stock_Out_No: string;
    QTY: number;
    Print_Qty: string;
    Storage_Serial: string;
    Modify_Date: string;
    User_Serial_Key: string;
}
export interface  Material_Label {
    Material_Label_Serial: string;
    Supplier: string;
    Material_Name: string;
    Color: string;
    Size: string;
    QTY: number;
    Total_QTY: number;
    Print_QTY: string;
    Print_Times: number;
    Label_Status: string;
    Order_No: string;
    Roll: string;
    Production: string;
    Supplier_No: string;
    Material_No: string;
    Work_Order: string;
    Material_Type: string;
    BarCode: string;
    Modify_Date: string;
    Print_Date: string;
    User_Serial_Key: string;
    Arrival_QTY: number;
}
export interface ExportLIST{
    Rack: string;
    User_Serial_Key: string;
    Material_No: string;
    Production: string;
    Work_Order: string;
    Supplier: string;
    Supplier_No: string;
    Material_Name: string;
    Color: string;
    Size: string;
    QTY: number;
    Order_No: string;
    Roll: string;
    chitietkien: string;
    Print_QTY: string;
    Print_Date: string;
}