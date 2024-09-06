"use client";

import { useState, useEffect } from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus, Edit } from 'lucide-react';
import { TodoList } from '../types/todoList';
import { api } from '../lib/api';

export default function TodoListHeader() {
  const [isEditing, setIsEditing] = useState(false);
  const [currentList, setCurrentList] = useState<TodoList | null>(null);
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);

  useEffect(() => {
    loadTodoLists();
  }, []);

  const loadTodoLists = async () => {
    try {
      let lists = await api.todoLists.find();
      if (lists.length === 0) {
        // If no lists are found, create a default one
        const defaultList = await api.todoLists.create('My First Todo List');
        lists = [defaultList];
      }
      setTodoLists(lists);
      setCurrentList(lists[0]);
    } catch (error) {
      console.error('Error loading or creating todo lists:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentList) {
      setCurrentList({ ...currentList, title: e.target.value });
    }
  };

  const handleNameSubmit = async () => {
    setIsEditing(false);
    if (currentList) {
      try {
        await api.todoLists.update(currentList.id, { title: currentList.title });
        loadTodoLists();
      } catch (error) {
        console.error('Error updating todo list name:', error);
      }
    }
  };

  const handleListSelect = (list: TodoList) => {
    setCurrentList(list);
    // TODO: Load todos for the selected list
  };

  const handleCreateNewList = async () => {
    try {
      const newList = await api.todoLists.create('New List');
      setTodoLists([...todoLists, newList]);
      setCurrentList(newList);
      setIsEditing(true);
    } catch (error) {
      console.error('Error creating new todo list:', error);
    }
  };

  if (!currentList) {
    return <CardHeader><CardTitle>Loading...</CardTitle></CardHeader>;
  }

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        {isEditing ? (
          <Input
            value={currentList.title}
            onChange={handleNameChange}
            onBlur={handleNameSubmit}
            className="w-64"
            autoFocus
          />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0">
                <CardTitle>{currentList.title}</CardTitle>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {todoLists.map((list) => (
                <DropdownMenuItem key={list.id} onSelect={() => handleListSelect(list)}>
                  {list.title}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem onSelect={handleCreateNewList}>
                <Plus className="mr-2 h-4 w-4" /> Create New List
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Button variant="ghost" size="sm" onClick={handleEditClick}>
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
  );
}