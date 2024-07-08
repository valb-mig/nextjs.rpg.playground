export interface CharactersInventory extends DbDefault {
    item: number;
    quant: number;
    active: boolean;
    updated_at: string;
    character_id: number;
    icon?: string;
}