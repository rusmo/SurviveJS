/**
 * Created by Will on 8/13/2015.
 */
import makeFinalStore from 'alt/utils/makeFinalStore';

export default function(alt, storage, storeName) {
    const finalStore = makeFinalStore(alt);

    alt.bootstrap(storage.get(storeName));

    finalStore.listen(() => {
        if (!storage.get('debug')) {
            storage.set(storeName, alt.takeSnapshot())
        }
    });
}