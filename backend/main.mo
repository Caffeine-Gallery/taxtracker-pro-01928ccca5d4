import Array "mo:base/Array";
import Hash "mo:base/Hash";

import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Option "mo:base/Option";

actor TaxPayerSystem {
    // TaxPayer record type
    public type TaxPayer = {
        tid: Text;
        firstName: Text;
        lastName: Text;
        address: Text;
    };

    // Stable variable to store TaxPayer records
    private stable var taxPayerEntries : [(Text, TaxPayer)] = [];
    private var taxPayers = HashMap.HashMap<Text, TaxPayer>(0, Text.equal, Text.hash);

    // System upgrade hooks
    system func preupgrade() {
        taxPayerEntries := Iter.toArray(taxPayers.entries());
    };

    system func postupgrade() {
        taxPayers := HashMap.fromIter<Text, TaxPayer>(taxPayerEntries.vals(), 0, Text.equal, Text.hash);
    };

    // Add a new TaxPayer record
    public func addTaxPayer(tp: TaxPayer) : async () {
        taxPayers.put(tp.tid, tp);
    };

    // Retrieve all TaxPayer records
    public query func getAllTaxPayers() : async [TaxPayer] {
        Iter.toArray(taxPayers.vals())
    };

    // Search for a TaxPayer record by TID
    public query func searchTaxPayer(tid: Text) : async ?TaxPayer {
        taxPayers.get(tid)
    };
}
