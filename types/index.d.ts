import React from "react";
interface DBSProps {
    open: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    children: React.ReactNode;
    noMinHeight?: boolean;
}
declare const DBS: React.FC<DBSProps>;
export default DBS;
