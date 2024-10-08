CREATE TABLE voyages (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    voyage_name VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT name_length CHECK (char_length(voyage_name) >= 3)
);

CREATE TABLE voyage_owners (
    voyage_id BIGINT REFERENCES voyages(id) ON DELETE CASCADE,
    owner_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    PRIMARY KEY (voyage_id, owner_id) 
);

ALTER TABLE voyages
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Voyage owners can delete their own voyage"
ON voyages
FOR DELETE
USING (
    EXISTS (
        SELECT 1
        FROM voyage_owners
        WHERE voyage_owners.voyage_id = voyages.id
        AND ((SELECT auth.uid()) = voyage_owners.owner_id)
    )
);