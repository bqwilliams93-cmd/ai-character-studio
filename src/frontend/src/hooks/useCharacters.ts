import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  Character,
  CharacterFilter,
  CharacterId,
  CreateCharacterRequest,
} from "../types/character";

export function useCharacters(filter: CharacterFilter = {}) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Character[]>({
    queryKey: ["characters", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCharacters(filter);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useCharacter(id: CharacterId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Character | null>({
    queryKey: ["character", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getCharacter(id);
    },
    enabled: !!actor && !isFetching && id !== null,
    staleTime: 60_000,
  });
}

export function useCreateCharacter() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<Character, Error, CreateCharacterRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createCharacter(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    },
  });
}

export function usePersonalityTypes() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<string[]>({
    queryKey: ["personalityTypes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPersonalityTypes() as Promise<string[]>;
    },
    enabled: !!actor && !isFetching,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useTraits() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<string[]>({
    queryKey: ["traits"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listTraits();
    },
    enabled: !!actor && !isFetching,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
