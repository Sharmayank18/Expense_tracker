
import { db } from '@/config/firebase'
import {
  collection,
  onSnapshot,
  query,
  QueryConstraint
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

const useFetchData = <T>(
    collectionName: string,
    constraints : QueryConstraint[] = []
    ) => {

        const [data,setData] = useState<T[]>([]);
        const [loading,setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
          if (!collectionName) return;
        
          const collectionRef = collection(db, collectionName);
          const q = query(collectionRef, ...constraints);
        
          const unsub = onSnapshot(
            q,
            (snapshot) => {
              const fetchedData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })) as T[];
        
              setData(fetchedData);
              setLoading(false);
            },
            (err) => {
              console.log("error fetching data:", err);
              setError(err.message);
              setLoading(false);
            }
          );
        
          return () => unsub();
        }, [collectionName, ...constraints]);
        
      
  return {data,loading,error};
   
  
}

export default useFetchData

const styles = StyleSheet.create({})




 /*
        useEffect(()=>{

          if(!collectionName) return;
          const collectionRef = collection(db,collectionName);
          const q = query(collectionRef,...constraints);

          const unsub = onSnapshot(q,(snapshot)=>{
            const fetchedData = snapshot.docs.map(doc=>{
              return{
                id:doc.id,
                ...doc.data()
              };
            }) as T[];
            setData(fetchedData);
            setLoading(false);
          },(err)=>{
             console.log("error fetching data:",err);
            setError(err.message);
            setLoading(false);
          });
          return ()=> unsub();
        })
*/
