import List "mo:core/List";
import CharacterTypes "types/characters";
import CharacterLib "lib/characters";
import CharactersApi "mixins/characters-api";

actor {
  let characters = List.empty<CharacterTypes.CharacterInternal>();
  let idCounter : [var Nat] = [var CharacterLib.seedIfEmpty(characters, 0)];

  include CharactersApi(characters, idCounter);
};
