import { create } from 'zustand'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** In-game currencies and resources. */
export interface Resources {
  gold: number
  mana: number
}

/** A single forge recipe being crafted. */
export interface ForgeTask {
  recipeId: string
  startedAt: number // epoch ms
  durationMs: number
}

/** Blacksmith progression. */
export interface Blacksmith {
  level: number
  experience: number
  experienceToNext: number
  title: string
}

// ---------------------------------------------------------------------------
// Store state & actions
// ---------------------------------------------------------------------------

export interface GameState {
  // Data
  resources: Resources
  blacksmith: Blacksmith
  forgeTask: ForgeTask | null

  // Resource actions
  earnGold: (amount: number) => void
  spendGold: (amount: number) => boolean
  earnMana: (amount: number) => void
  spendMana: (amount: number) => boolean

  // Blacksmith actions
  gainExperience: (amount: number) => void

  // Forge actions
  startForge: (recipeId: string, durationMs: number) => void
  completeForge: () => void

  // Meta
  resetGame: () => void
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const INITIAL_RESOURCES: Resources = {
  gold: 0,
  mana: 0,
}

const INITIAL_BLACKSMITH: Blacksmith = {
  level: 1,
  experience: 0,
  experienceToNext: 100,
  title: 'Novice',
}

// ---------------------------------------------------------------------------
// Title thresholds (level → title)
// ---------------------------------------------------------------------------

function titleForLevel(level: number): string {
  if (level >= 20) return 'Legend'
  if (level >= 15) return 'Master'
  if (level >= 10) return 'Expert'
  if (level >= 5) return 'Apprentice'
  return 'Novice'
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useGameStore = create<GameState>((set, get) => ({
  resources: { ...INITIAL_RESOURCES },
  blacksmith: { ...INITIAL_BLACKSMITH },
  forgeTask: null,

  // -- Resources -----------------------------------------------------------

  earnGold(amount) {
    set((s) => ({
      resources: { ...s.resources, gold: s.resources.gold + amount },
    }))
  },

  spendGold(amount) {
    const { gold } = get().resources
    if (gold < amount) return false
    set((s) => ({
      resources: { ...s.resources, gold: s.resources.gold - amount },
    }))
    return true
  },

  earnMana(amount) {
    set((s) => ({
      resources: { ...s.resources, mana: s.resources.mana + amount },
    }))
  },

  spendMana(amount) {
    const { mana } = get().resources
    if (mana < amount) return false
    set((s) => ({
      resources: { ...s.resources, mana: s.resources.mana - amount },
    }))
    return true
  },

  // -- Blacksmith ----------------------------------------------------------

  gainExperience(amount) {
    set((s) => {
      let { level, experience, experienceToNext } = s.blacksmith
      experience += amount

      // Level-up loop (can gain multiple levels at once)
      while (experience >= experienceToNext) {
        experience -= experienceToNext
        level += 1
        // Each level requires 20% more XP than the previous
        experienceToNext = Math.floor(experienceToNext * 1.2)
      }

      return {
        blacksmith: {
          level,
          experience,
          experienceToNext,
          title: titleForLevel(level),
        },
      }
    })
  },

  // -- Forge ---------------------------------------------------------------

  startForge(recipeId, durationMs) {
    // Only one forge task at a time
    if (get().forgeTask) return
    set({
      forgeTask: {
        recipeId,
        startedAt: Date.now(),
        durationMs,
      },
    })
  },

  completeForge() {
    const task = get().forgeTask
    if (!task) return
    // Award gold + XP for completing a craft
    const goldReward = 10
    const xpReward = 25
    set((s) => ({
      forgeTask: null,
      resources: { ...s.resources, gold: s.resources.gold + goldReward },
    }))
    get().gainExperience(xpReward)
  },

  // -- Meta ----------------------------------------------------------------

  resetGame() {
    set({
      resources: { ...INITIAL_RESOURCES },
      blacksmith: { ...INITIAL_BLACKSMITH },
      forgeTask: null,
    })
  },
}))
