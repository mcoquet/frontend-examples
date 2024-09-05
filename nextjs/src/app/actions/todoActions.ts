'use server'

import Manifest from "@mnfst/sdk";

const manifest = new Manifest();

export async function createTodo(title: string) {
  try {
    await manifest.from('todos').create({ title, completed: false });
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
}