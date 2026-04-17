import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type CharacterId = bigint;
export interface CreateCharacterRequest {
    traits: Array<Trait>;
    name: string;
    personalityType: PersonalityType;
    personalityDescription: string;
    avatarStyle: AvatarStyle;
    backgroundSnippet: string;
}
export interface CharacterFilter {
    trait?: Trait;
    personalityType?: PersonalityType;
    searchQuery?: string;
}
export interface Character {
    id: CharacterId;
    traits: Array<Trait>;
    name: string;
    createdAt: bigint;
    isPreseeded: boolean;
    personalityType: PersonalityType;
    personalityDescription: string;
    avatarStyle: AvatarStyle;
    backgroundSnippet: string;
}
export type Trait = string;
export enum AvatarStyle {
    illustrated = "illustrated",
    anime = "anime",
    realistic = "realistic",
    pixelArt = "pixelArt",
    watercolor = "watercolor"
}
export enum PersonalityType {
    analytical = "analytical",
    creative = "creative",
    introverted = "introverted",
    mysterious = "mysterious",
    playful = "playful",
    adventurous = "adventurous",
    extroverted = "extroverted",
    empathetic = "empathetic"
}
export interface backendInterface {
    createCharacter(req: CreateCharacterRequest): Promise<Character>;
    getCharacter(id: CharacterId): Promise<Character | null>;
    listCharacters(filter: CharacterFilter): Promise<Array<Character>>;
    listPersonalityTypes(): Promise<Array<PersonalityType>>;
    listTraits(): Promise<Array<Trait>>;
}
